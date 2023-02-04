import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Style from "@/styles/Style.module.scss";
import { TbLoader } from "react-icons/tb";

const formSchema = z
  .object({
    email: z.string().email(),
    age: z.coerce.number().gte(1),
  })
  .required();

const Form = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async () =>
    await new Promise((resolve) => setTimeout(resolve, 2500));

  return (
    <div className={Style.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <form className={Style.wrapper__form}>
        <div className={Style.form__row}>
          <label>Email</label>
          <input type="text" {...register("email")} />
          {errors.email && <small>{errors.email.message!.toString()}</small>}
        </div>
        <div className={Style.form__row}>
          <label>Age</label>
          <input type="string" {...register("age")} />
          {errors.age && <small>{errors.age.message!.toString()}</small>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          data-loading={isSubmitting}
        >
          {isSubmitting ? <TbLoader /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Form;
