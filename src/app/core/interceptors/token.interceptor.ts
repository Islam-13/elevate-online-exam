import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('loggedToken');

  if (token) req = req.clone({ setHeaders: { token } });

  return next(req);
};
