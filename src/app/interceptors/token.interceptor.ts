import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let token = "";
  let auth_req = req.clone({
    setHeaders:{
      Authorization:"bearer "+ token
    }
  });
  console.log("sending request", auth_req.method, " ", auth_req.url);
  return next(auth_req);
};
