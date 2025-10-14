import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export const config = {
  matcher: ["/", "/thanks", "/pricing"],
};

const loginVerifyAPI = async ({ token }: { token: string }) => {
  if (!token) {
    return {
      status: 400,
      body: null,
    };
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "any",
    },
  };

  const connect = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/client/token`,
    {
      method: "PATCH",
      headers: config.headers,
    },
  );

  const data = await connect.json();
  const status = connect.status;
  if (status === 200) {
    const signatureValidation = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/client-signature/validation`,
      {
        method: "GET",
        headers: config.headers,
      },
    );
    const status = signatureValidation.status;
    return {
      status,
      body: {
        isSignature: true,
        token: data.accessToken,
      },
    };
  }
  return {
    status,
    body: data,
  };
};

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.indexOf("icon") > -1 ||
    req.nextUrl.pathname.indexOf("chrome") > -1
  )
    return NextResponse.next();

  const queryToken = req.nextUrl.searchParams.get("token");

  const cookieStore = await cookies();
  const token = queryToken
    ? queryToken
    : cookieStore.get(process.env.NEXT_PUBLIC_USER_TOKEN as string)?.value;

  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  const connect = await loginVerifyAPI({
    token: token,
  });

  if (connect.status === 200) {
    const res = NextResponse.next();
    res.cookies.set(
      process.env.NEXT_PUBLIC_USER_TOKEN as string,
      connect.body.accessToken,
    );
  }

  if (connect.status !== 200 && !connect.body.isSignature)
    return NextResponse.redirect(new URL("/login", req.url));

  if (connect.status !== 200 && connect.body.isSignature) {
    return NextResponse.redirect(new URL("/plans", req.url));
  }

  return NextResponse.next();
}
