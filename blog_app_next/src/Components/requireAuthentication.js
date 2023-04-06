export function requireAuthentication(gssp) {
  return async (context) => {
    const { req, res } = context;
    const token = req.cookies.token;

    if (!token) {
      // Redirect to login page
      return {
        redirect: {
          destination: "/login",
          statusCode: 302,
        },
      };
    }

    return await gssp(context);
  };
}
