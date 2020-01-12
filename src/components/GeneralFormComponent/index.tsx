import React, {
  useState, useEffect, PropsWithChildren,
} from 'react';
import {
  Container,
  Button,
  Card,
  CardHeader,
  CardContent,
  CircularProgress,
} from '@material-ui/core';
import {
  Formik,
  Form,
  Field,
} from 'formik';
import {
  TextField,
} from 'formik-material-ui';
import ImageField from '../ImageField';
import * as Yup from 'yup';
import { useObserver } from 'mobx-react';
import StorageStore from '../../stores/Storage';
import { useParams, useHistory } from 'react-router';
import { BaseData } from './types';
import { Props, FormKeys } from './types';
import { Languages } from '../../utils/translation';

const MAXIMUM_IMAGE_SIZE = 2 * 1024 * 1024;

const mapDataToFormData = <T extends BaseData>(data: T) => {
  const formData: Record<string, any> = data;
  Object.entries(data.content).forEach((content) => {
    const suffix = content[0].slice(0, 1).toUpperCase() + content[0].slice(1);
    Object.entries(content[1]).forEach((langContent) => {
      formData[langContent[0] + suffix] = langContent[1];
    });
  });
  return formData;
};

const mapFormDataToData = <T extends BaseData>(formData: Record<string, string | File | null>, schema: FormKeys<T>[]): Omit<T, 'key'> => {
  const data: T = generateEmptyData(schema);
  delete data.key;
  Object.entries(formData).forEach((form) => {
    const langs: string[] = Object.values(Languages);
    const suffix = form[0].slice(-2, -1).toLowerCase() + form[0].slice(-1);
    if (langs.includes(suffix)) {
      data.content[suffix as Languages][form[0].slice(0, -2)] = form[1];
    } else {
      (data as any)[form[0]] = form[1];
    }
  });
  return data;
};

const generateEmptyData = <T extends BaseData>(schema: FormKeys<T>[]): T => {
  const data: any = {
    content: {
    },
  };
  Object.values(Languages).forEach(lang => {
    data.content[lang] = {};
  });
  schema.forEach((schemaItem) => {
    if (schemaItem.inContent) {
      const langs = Object.values(Languages);
      langs.forEach((lang) => {
        if (schemaItem.type !== 'image') {
          data.content[lang][schemaItem.key] = '';
        } else {
          data.content[lang][schemaItem.key] = null;
        }
      });
    } else {
      if (schemaItem.type !== 'image') {
        data[schemaItem.key] = '';
      } else {
        data[schemaItem.key] = null;
      }
    }
  });
  return data as T;
};

const uploadImagesFormData = async <T extends BaseData>(schema: FormKeys<T>[], formData: Record<string, string | File | null>) => {
  const promisesArray: Promise<void>[] = [];
  schema.forEach((item) => {
    if (item.type === 'image') {
      promisesArray.push(new Promise(async (res, rej) => {
        try {
          if (item.inContent) {
            const langs = Object.values(Languages).map(lang => lang[0].toUpperCase() + lang.slice(1));
            const imagesArray: Promise<string>[] = [];
            langs.forEach((lang) => {
              imagesArray.push(new Promise(async (res, rej) => {
                try {
                  formData[item.key + lang] = await StorageStore.uploadImage(formData[item.key + lang]);
                  res();
                } catch (error) {
                  rej(error);
                }
              }));
            });
            await Promise.all(imagesArray);
          } else {
            (formData as any)[item.key] = await StorageStore.uploadImage((formData as any)[item.key]);
          }
          res();
        } catch (error) {
          rej(error);
        }
      }));
    }
  });
  await Promise.all(promisesArray);
  return formData;
};

const textValidationSchema = Yup.string().required();
const imageValidationSchema = Yup.mixed().required()
  .test('fileFormat', 'Images only (PNG / JPG)', (value: File | string) => {
    if (typeof value === 'string') {
      return true;
    }
    return value && (value.type === 'image/png' || value.type === 'image/jpeg');
  }).test('fileSize', 'Image size must be less than 1MB', (value: File | string) => {
    if (typeof value === 'string') {
      return true;
    }
    return value && value.size <= MAXIMUM_IMAGE_SIZE;
  });

const generateValidationSchema = <T extends BaseData>(schema: FormKeys<T>[]) => {
  const validationSchema: any = {};
  schema.forEach((value) => {
    if (value.inContent) {
      Object.values(Languages).forEach((lang) => {
        const suffix = lang[0].toUpperCase() + lang.slice(1);
        if (value.type === 'image') {
          validationSchema[value.key + suffix] = imageValidationSchema.clone();
        } else {
          validationSchema[value.key + suffix] = textValidationSchema.clone();
        }
      });
    } else {
      if (value.type === 'image') {
        validationSchema[value.key] = imageValidationSchema.clone();
      } else {
        validationSchema[value.key] = textValidationSchema.clone();
      }
    }
  });
  return Yup.object(validationSchema);
};

const generateEmptyFormData = <T extends BaseData>(schema: FormKeys<T>[]) => {
  const langs = Object.values(Languages);
  const emptyData: Record<string, string | File | null> = {};
  schema.forEach((schemaItem) => {
    if (schemaItem.inContent) {
      langs.forEach((lang) => {
        const suffix = lang.slice(0, 1).toUpperCase() + lang.slice(1);
        if (schemaItem.type !== 'image') {
          emptyData[schemaItem.key as string + suffix] = '';
        } else {
          emptyData[schemaItem.key as string + suffix] = null;
        }
      });
    } else {
      if (schemaItem.type !== 'image') {
        emptyData[schemaItem.key as string] = '';
      } else {
        emptyData[schemaItem.key as string] = null;
      }
    }
  });
  return emptyData;
};

const GeneralFormComponent = <T extends BaseData>(props: PropsWithChildren<Props<T>>) => {
  const params = useParams<Pick<T, 'key'>>();
  const history = useHistory();
  const [initialValues, setInitialValues] = useState(generateEmptyFormData(props.formData));
  useEffect(() => {
    if (params && params.key) {
      if (params.key !== 'new') {
        const selectedItem = props.data.find(item => item.key === params.key);
        if (selectedItem) {
          setInitialValues(mapDataToFormData<T>(selectedItem));
        } else {
          history.goBack();
        }
      }
    }
  }, [
    params,
    history,
    props.data,
  ]);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  return useObserver(() =>
    < Container
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={generateValidationSchema(props.formData)}
        onSubmit={async (values) => {
          // try {
          setIsSaving(true);
          values = await uploadImagesFormData(props.formData, values);
          const value: Omit<T, 'key'> = mapFormDataToData(values, props.formData);
          if (params.key !== 'new') {
            await props.editAction(params.key, value);
          } else {
            await props.addAction(value);
          }
          history.goBack();
          // } catch (error) {
          //   alert("Sorry an error occured");
          // } finally {
          //   setIsSaving(false);
          // }
        }}
      >
        {
          (formikBag) => {
            return (
              <Form
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}
              >
                {
                  props.formData.filter(data => !data.inContent).map(data => {
                    if (data.type === 'image') {
                      return (
                        <ImageField
                          value={(formikBag.values as any)[data.key]}
                          error={(formikBag.errors as any)[data.key]}
                          setValue={(value) => formikBag.setFieldValue(data.key as string, value)}
                        />
                      );
                    } else if (data.type === 'textarea') {
                      return (
                        <Field
                          name={data.key}
                          component={TextField}
                          margin="normal"
                          variant="outlined"
                          placeholder={data.title}
                          required
                          label={data.title}
                          error={(formikBag.errors as any)[data.key]}
                          multiline
                          rows={12}
                          fullWidth
                        />
                      );
                    } else {
                      return (
                        <Field
                          name={data.key}
                          component={TextField}
                          margin="normal"
                          variant="outlined"
                          placeholder={data.title}
                          required
                          label={data.title}
                          error={(formikBag.errors as any)[data.key]}
                        />
                      );
                    }
                  })
                }
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}
                >
                  {
                    Object.values(Languages).map(lang => {
                      const suffix = lang[0].toUpperCase() + lang.slice(1);
                      return (
                        <Card
                          style={{
                            margin: 24,
                          }}
                        >
                          <CardHeader
                            title={lang}
                          />
                          <CardContent>
                            {
                              props.formData.filter(data => data.inContent).map(data => {
                                if (data.type === 'image') {
                                  return (
                                    <ImageField
                                      value={(formikBag.values as any)[data.key + suffix]}
                                      error={(formikBag.errors as any)[data.key + suffix]}
                                      setValue={(value) => formikBag.setFieldValue(data.key + suffix, value)}
                                    />
                                  );
                                } else if (data.type === 'textarea') {
                                  return (
                                    <Field
                                      name={data.key + suffix}
                                      component={TextField}
                                      margin="normal"
                                      variant="outlined"
                                      placeholder={data.title}
                                      required
                                      label={data.title}
                                      error={(formikBag.errors as any)[data.key + suffix]}
                                      multiline
                                      rows={12}
                                      fullWidth
                                    />
                                  );
                                } else {
                                  return (
                                    <Field
                                      name={data.key + suffix}
                                      component={TextField}
                                      margin="normal"
                                      variant="outlined"
                                      placeholder={data.title}
                                      required
                                      label={data.title}
                                      error={(formikBag.errors as any)[data.key + suffix]}
                                    />
                                  );
                                }
                              })
                            }
                          </CardContent>
                        </Card>
                      );
                    })
                  }
                </div>
                <Button
                  style={{
                    marginTop: 24,
                    marginBottom: 24,
                  }}
                  onClick={formikBag.submitForm}
                  variant="contained"
                  size="large"
                  disabled={isSaving}
                >
                  {
                    !isSaving
                      ? 'Save'
                      : (
                        <CircularProgress />
                      )
                  }
                </Button>
              </Form>
            );
          }
        }
      </Formik>
    </Container >
  );
}

export default GeneralFormComponent;
