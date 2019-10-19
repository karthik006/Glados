export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            if(firebase.auth().user.emailVerified)
                dispatch({ type: 'LOGIN_SUCCESS' });
            else
                firebase.auth().signOut().then(() => {
                    dispatch({ type: 'LOGIN_SUCCESS_VER' })
                })
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err });
        })
    }
}

export const signOut = () => {
    return(dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' })
        })
    }
}

export const signUp = (newUser) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        var curUser;

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            curUser = resp.user;
            return firestore.collection('Users').doc(resp.user.uid).set({
                username: newUser.username,
                uid: resp.user.uid,
                image: 'default'
            })
        }).then(() => {
            curUser.sendEmailVerification().then(() => {
                firebase.auth().signOut().then(() => {
                    dispatch({ type: 'SIGNUP_SUCCESS' })
                })
            }).catch((err) => {
                dispatch({ type: 'SIGNUP_ERROR', err })
            })
        }).catch((err) => {
            dispatch({ type: 'SIGNUP_ERROR', err });
        })
    }
}