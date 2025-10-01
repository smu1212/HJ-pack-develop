export const IS_DEBUG =
  process.env.NEXT_PUBLIC_DEBUG === 'true' ||
  process.env.NODE_ENV === 'development';
export const IS_LOCAL = process.env.NEXT_PUBLIC_LOCAL === 'true';

console.log(
  `IS_DEBUG ? : ${IS_DEBUG} && IS_LOCAL ? : ${process.env.NEXT_PUBLIC_DEBUG === 'true'}`,
);

export const BE_HOST = 'http://localhost:3000';
export const FE_DOMAIN = 'localhost';
export const FE_HOST = `http://${FE_DOMAIN}:4000`;

// TODO: 추후 수정
// export const BE_HOST = IS_DEBUG
//   ? IS_LOCAL
//     ? 'http://localhost:3000'
//     : 'https://api.dev.soosan.eoe.sh'
//   : 'https://api.soosancebotics.com';

// export const FE_DOMAIN = IS_DEBUG
//   ? IS_LOCAL
//     ? 'localhost'
//     : 'dev.soosan.eoe.sh'
//   : 'soosancebotics.com';

// export const FE_HOST = IS_DEBUG
//   ? IS_LOCAL
//     ? `http://${FE_DOMAIN}:4000`
//     : `https://${FE_DOMAIN}`
//   : `https://${FE_DOMAIN}`;

export const DEFAULT_HEADERS: Record<string, string> = {
  'Content-Type': 'application/json; charset=utf-8',
};

// NOTE: NEXT_PUBLIC_DEBUG=true yarn dev 로 실행해야함.
if (IS_DEBUG) {
  console.warn('DEBUG 모드가 활성화 되었습니다.');
}

export const CREDENTIAL_OPTIONS: Partial<RequestInit> = IS_DEBUG
  ? {}
  : {
      credentials: 'include',
      mode: 'cors',
    };
