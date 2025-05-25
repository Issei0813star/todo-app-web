import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
  username: z.string().min(1, "ユーザー名は必須です"),
  password: z.string().min(6, "パスワードは6文字以上で入力してください"),
});

type FormData = z.infer<typeof schema>;

const RegisterPage: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    // TODO: リクエスト
    console.log("send register", data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md w-80">
        <h1 className="text-xl font-bold mb-4">サインアップ</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="メールアドレス"
            {...register("email")}
            className={`w-full mb-1 p-2 border rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
          )}

          <input
            type="text"
            placeholder="ユーザー名"
            {...register("username")}
            className={`w-full mb-1 p-2 border rounded ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mb-2">
              {errors.username.message}
            </p>
          )}

          <input
            type="password"
            placeholder="パスワード"
            {...register("password")}
            className={`w-full mb-1 p-2 border rounded ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-2">
              {errors.password.message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            サインアップ
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
