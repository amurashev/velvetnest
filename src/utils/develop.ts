const ENV = process.env.NEXT_PUBLIC_ENV;

export const isDev = () => ENV === "develop";
