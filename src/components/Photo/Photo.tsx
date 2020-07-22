import './Photo.scss';

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FaFileImage, FaSpinner } from 'react-icons/fa';

import Button from '../Button/Button';
import Input, { InputProps } from '../Input/Input';

export default function Photo({ register, ...props }: InputProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { watch, setValue } = useFormContext();
  const photo = watch(props.name);

  return (
    <label className="Photo" htmlFor={`${props.name}_file`}>
      <input
        type="file"
        id={`${props.name}_file`}
        onChange={(ev) => {
          if (ev.target.files) {
            setIsLoading(true);
            const reader = new FileReader();
            reader.readAsDataURL(ev.target.files[0]);
            reader.onload = (ev) => {
              setValue(props.name, ev.target?.result);
              setIsLoading(false);
            };
          }
        }}
        multiple={false}
      />
      <Input {...props} />
      <div className="Photo-image">
        {photo && !isLoading ? (
          <img src={photo} alt={props.name} />
        ) : (
          <div className="Photo-empty">
            {isLoading ? (
              <FaSpinner className="Spin" />
            ) : (
              <>
                <FaFileImage />
                <p>Adicionar Foto</p>
              </>
            )}
          </div>
        )}
      </div>
      <Button inverse={true} onClick={() => setValue(props.name, undefined)}>
        Remover Foto
      </Button>
    </label>
  );
}
