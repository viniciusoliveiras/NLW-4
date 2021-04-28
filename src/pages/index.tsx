import Head from 'next/head';
import { FormEvent, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { toast, Zoom } from 'react-toastify';
import { useRouter } from 'next/router';
import Loader from 'react-loader-spinner';

import { api } from '../services/api';

import styles from '../styles/pages/Login.module.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [userIRLName, setUserIRLName] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function handleUserSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      setIsLoading(true);
      const { data } = await api.get(`${username}`);

      setUserAvatar(data.avatar_url);
      setUserIRLName(data.name || data.login);

      router.push('/home');
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      setUsername('');
      toast.error('Usuário não encontrado no Github', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Zoom,
      });
    }
  }

  useEffect(() => {
    Cookies.set('avatar', String(userAvatar));
    Cookies.set('name', String(userIRLName));
  }, [userAvatar, userIRLName]);

  return (
    <>
      <Head>
        <title>Login | move.it</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.loginContainer}>
          <img src='/logo-login.svg' alt='move.it' />

          <p>Bem-vindo</p>

          <div className={styles.github}>
            <img src='/github-logo.svg' alt='github' />
            <span>
              Faça login com seu Github
              <br /> para começar
            </span>
          </div>

          <form className={styles.form} onSubmit={handleUserSubmit}>
            <input
              type='text'
              name='username'
              placeholder='Digite seu username'
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
            {!username && (
              <button type='submit' className={styles.notActiveButton}>
                {isLoading ? (
                  <Loader type='Oval' color='#FFF' height={35} width={35} />
                ) : (
                  <i className='fas fa-arrow-right fa-lg'></i>
                )}
              </button>
            )}

            {username && (
              <button type='submit' className={styles.activeButton}>
                {isLoading ? (
                  <Loader type='Oval' color='#FFF' height={35} width={35} />
                ) : (
                  <i className='fas fa-arrow-right fa-lg'></i>
                )}
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
