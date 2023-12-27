const CONTENT_TYPES = {
  json: 'application/json',
  form: 'application/x-www-form-urlencoded',
};

type TokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export async function connect(): Promise<TokenResponse> {
  const token = localStorage.getItem(
    'nyckel_token'
  ) as unknown as TokenResponse;
  if (token && Date.now() < token.expires_in) {
    return token;
  }

  const requestBody = {
    client_id: import.meta.env.VITE_NYCKEL_CLIENT_ID,
    client_secret: import.meta.env.VITE_NYCKEL_CLIENT_SECRET,
    grant_type: 'client_credentials',
  };

  let tokenResp: TokenResponse = {
    access_token: '',
    token_type: '',
    expires_in: 0,
  };

  try {
    const resp = await fetch(
      `${import.meta.env.VITE_NYCKEL_URL}/connect/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': CONTENT_TYPES.form,
        },
        body: new URLSearchParams(requestBody).toString(),
      }
    );

    tokenResp = (await resp.json()) as unknown as TokenResponse;
    const tokenResp_: TokenResponse = {
      access_token: tokenResp.access_token,
      token_type: tokenResp.token_type,
      expires_in: Date.now() + tokenResp.expires_in * 1000,
    };

    localStorage.setItem('nyckel_token', JSON.stringify(tokenResp_));
  } catch (e) {
    console.error(
      'Failed to connect to Nyckel. Please check your Nyckel credentials.',
      e
    );
  }

  return tokenResp;
}

export type InvokeResponse = {
  labelName: string;
  labelId: string;
  confidence: number;
};

export async function invoke(
  imgSrc: string,
  token: string
): Promise<InvokeResponse> {
  try {
    const url = new URL(
      `${import.meta.env.VITE_NYCKEL_URL}/v1/functions/${
        import.meta.env.VITE_NYCKEL_FUNCTION_ID
      }/invoke`
    );
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': CONTENT_TYPES.json,
      },
      body: JSON.stringify({ data: `data:image/jpeg;base64,${imgSrc}` }),
    });

    return (await resp.json()) as unknown as InvokeResponse;
  } catch (e) {
    throw Error(`Failed to invoke Nyckel. Reason: ${e}`);
  }
}
