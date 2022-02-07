import { ErrorMessage } from "@hookform/error-message";
import React, { useEffect } from "react";
import { useForm, useFieldArray} from "react-hook-form";

export function InviteForm() {
    const {
      register,
      handleSubmit,
      control,
      formState: { errors },
    } = useForm({criteriaMode: 'all', mode: 'onBlur'});
    const {fields, append, remove} = useFieldArray({
        control,
        name: "person",
    })
    useEffect(() => {
      appendField();
    }, []);

    const appendField = () => {
      append({ name: "", email: "" })
    }

    const renderError = ({ message }) => {return <p>{message}</p>}

  return (
    <>
      <h1>Приглашение на вечеринку</h1>
      <form
        className="form"
        onSubmit={handleSubmit((data) => {
          alert(JSON.stringify(data));
        })}
      >
        {fields.map((field, index) => (
          <div key={index} className="container">
            <div className="inp-container">
              <label className="form-label">Имя</label>
              <input
                className="form-control"
                {...register(`person.${index}.name`, {
                  required: "Это поле обязательно",
                })}
              />
              <ErrorMessage
                errors={errors}
                name={`person.${index}.name`}
                render={renderError}
              />
            </div>
            <div className="inp-container">
              <label className="form-label">E-mail</label>
              <input
                className="form-control"
                {...register(`person.${index}.email`, {
                  required: "Это поле обязательно",
                  pattern: {
                    value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "Некорректный формат e-mail",
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name={`person.${index}.email`}
                render={renderError}
              />
            </div>
            {index > 0 && (
              <button type="button" onClick={() => remove(index)}>
                X
              </button>
            )}
          </div>
        ))}
        <button className="button" type="button" onClick={() => appendField()}>
          Добавить гостя
        </button>
        <label>Название мероприятия</label>
        <input
          type="text"
          {...register("title", {
            required: "Это поле обязательно",
          })}
        />
        <ErrorMessage errors={errors} name="title" render={renderError} />
        <label>Описание мероприятия</label>
        <textarea
          {...register("description", {
            required: "Это поле обязательно",
          })}
        />
        <ErrorMessage errors={errors} name="description" render={renderError} />
        <label>Дата и время</label>
        <input
          type="datetime-local"
          {...register("timestamp", {
            required: "Это поле обязательно",
          })}
        />
        <ErrorMessage errors={errors} name="timestamp" render={renderError} />
        <input type="submit" className="button" />
      </form>
    </>
  );
}

  
  