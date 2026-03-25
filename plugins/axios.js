export default function ({ app }) {
  const registerInterceptors = (axios) => {
    axios.onRequest((config) => {
      config.paramsSerializer = (params) => {
        const searchParams = new URLSearchParams();
        for (const [key, value] of Object.entries(params)) {
          if (Array.isArray(value)) {
            value.forEach((item) => searchParams.append(key, item));
          } else {
            searchParams.append(key, value);
          }
        }
        return searchParams.toString();
      };
    });
  };

  registerInterceptors(app.$axios);
}
