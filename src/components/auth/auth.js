import React, { useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from '../../aws-exports';
import { useNavigate } from 'react-router-dom';

Amplify.configure(config);

const Auth = ({ user }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate("/")
            localStorage.setItem('userLogIn', true)
        }
    }, [user])

    return (
        <>
            <p className='text-[30px] text-black text-center'>
                Loading....
            </p>
        </>
    );
};

export default withAuthenticator(Auth, { socialProviders: ['google'] });