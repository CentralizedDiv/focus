import './Photo.scss';

import Button from 'components/shared/Button/Button';
import Input, { InputProps } from 'components/shared/Input/Input';
import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FaFileImage, FaSpinner } from 'react-icons/fa';

export default function Photo({ ...props }: InputProps) {
  const [isLoading, setIsLoading] = useState(false);
  const fileInput = useRef<HTMLInputElement | null>(null);
  const { getValues, setValue } = useFormContext();
  const [photo, setPhoto] = useState<string | undefined>(getValues(props.name));

  useEffect(() => {
    setValue(props.name, photo);
  }, [photo, props.name, setValue]);

  return (
    <label className="Photo" htmlFor={`${props.name}_file`}>
      <input
        type="file"
        id={`${props.name}_file`}
        onChange={(ev) => {
          const oldPhoto = photo;
          setIsLoading(true);
          setPhoto(undefined);
          if (ev.target.files) {
            const reader = new FileReader();
            reader.readAsDataURL(ev.target.files[0]);
            reader.onload = (ev) => {
              setIsLoading(false);
              setPhoto(ev.target?.result as string);
            };
          } else {
            setIsLoading(false);
            setPhoto(oldPhoto);
          }
        }}
        disabled={isLoading}
        multiple={false}
        ref={fileInput}
      />
      <Input {...props} />
      <div className="Photo-image">
        {isLoading && (
          <div className="Photo-empty">
            <FaSpinner className="Spin" />
          </div>
        )}
        {photo && !isLoading && <img src={photo} alt={props.name} />}
        {!photo && !isLoading && (
          <div className="Photo-empty">
            <FaFileImage />
            <p>Adicionar Foto</p>
          </div>
        )}
      </div>
      <Button
        inverse={true}
        onClick={() => {
          setPhoto(undefined);
          if (fileInput && fileInput.current) {
            fileInput.current.value = "";
          }
        }}
      >
        Remover Foto
      </Button>
    </label>
  );
}
