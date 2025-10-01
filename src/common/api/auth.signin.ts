import { api } from '@common/api/axios';

interface SignInResponse {
  accessToken: string;
}

export type SignInResult =
  | { status: 'success'; token: string }
  | { status: 'error'; message: string };

export async function signIn(passwordHash: string): Promise<SignInResult> {
  try {
    const { data } = await api.post<SignInResponse>('/signin', {
      password: passwordHash,
    });

    const token = data?.accessToken?.trim();
    if (!token) {
      return { status: 'error', message: '토큰을 찾을 수 없습니다.' } as const;
    }

    return { status: 'success', token } as const;
  } catch (error) {
    console.error('signin error', error);
    return {
      status: 'error',
      message: '로그인 중 오류가 발생했습니다.',
    } as const;
  }
}
