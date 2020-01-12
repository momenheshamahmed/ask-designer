import {
  observable, action,
} from 'mobx';
import {
  auth,
  Unsubscribe,
} from 'firebase';

class AuthStore {
  @observable isAuthenticating = true;
  @observable isAuthenticated = false;

  authenticationSubscription: Unsubscribe | null = null;

  @action
  syncStatus = () => {
    this.isAuthenticating = true;
    this.authenticationSubscription = auth().onIdTokenChanged((user) => {
      if (!user) {
        this.isAuthenticated = false;
        this.logout();
      } else {
        this.isAuthenticated = true;
      }
      this.isAuthenticating = false
    });
  }

  @action
  login = async (email: string, password: string) => {
    try {
      this.isAuthenticating = true;
      await auth().setPersistence(auth.Auth.Persistence.LOCAL);
      await auth().signInWithEmailAndPassword(email, password);
      this.isAuthenticated = true;
      this.isAuthenticating = false;
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  @action
  logout = async () => {
    this.isAuthenticating = true;
    await auth().signOut();
    this.isAuthenticating = false;
    if (this.authenticationSubscription) {
      this.authenticationSubscription();
    }
  }
}

export default new AuthStore();