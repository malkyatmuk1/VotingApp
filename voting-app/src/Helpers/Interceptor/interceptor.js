import axios from 'axios';
import {
    AppContext
} from "./../../context/applicationContext";
export const context = AppContext;

axios.interceptors.request.use((config) => {
    let token = localStorage.getItem('token');
    if (token) {
        config.headers = {
            'Authorization': 'eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJleGFtcGxlLmlvIiwic3ViIjoiMyxwZXRhciIsImV4cCI6MTY2OTcxNTcwOCwiaWF0IjoxNjY5Njc5NzA4LCJyb2xlcyI6IiJ9.V_7TudFRXVcLqYpJioG9TfZ0oTunIG_-6iyBfeBE7-vJ2XP34dA5LrWAsiyxGHcW3K8THCvis4_cL0Z_V_aOuFt-7KLrLBOVDEeTuIetus0MEPGjSpHjc8XMHPo1cyOn-5N0qMHQ9gIzTTvyjmzgOPQlZMqcdf9NvsQNYeSC8KL9DVvHLWO1BsrPHFXQKqkcsuk3TrOO7Y2spTKzTFeUNRIncufDhErjtpshSkwbhbh89J2IyoZb_VEz2dzmZGhYihY__VGqVEWq3NTJJJ-PZLSRnHnez2bCYJoSM7VZyh7OK1RbAf6rUo8zs7J9ggJzaPEKHpfgR4tOFJqaVa6U_VZVxSd_PDvcooSREkNEcJrZB9ASSMDLTMPh1I3CRgQmtBldM6El9-qQnXkOANJ8AQyNGhpKTlwYQeeN225xBhvSgW6vokdxZOKFxSuahvH262I982CxZk4JeHGsRnHUWJloQcAD7JTglBOQQ-TILaj9JZsQhbsvgpwsSjULkWs8zaseDYn8VqgZ5rpnD_hxjkQOKUpWq4xC7Xv9j3kNOSq7r5h1CCzWLIFzoKqYZDX2MnMKwrorVT7sk0MMY12CfYQd7NwtaxbKq7Q1ALY6VRQaYeD4wCqovI8MZSuo9xaIXuR2_Ono2kELzAzAeP0YY3g3Xkc1Ui_yegiiUrz89-E',
            'Cache-Control': 'no-cache'
        }
        console.log('INTERCEPTOR: ', config);
    }
    return config;
}, error => {
    console.log('REJECT WITH ERROR -> ', error);
    return Promise.reject(error);
});
