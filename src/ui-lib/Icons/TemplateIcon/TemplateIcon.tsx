import React, { FC } from 'react';

type TTemplateIcon = {
  icon: any;
  width?: string | number;
  alt?: string;
  height?: string | number;
  className?: string;
};

const TemplateIcon: FC<TTemplateIcon> = ({
  icon,
  alt,
  width = '24',
  height = '24',
  className = '',
}) => (
  <img
    className={className}
    style={{ width: `${String(width)}px`, height: `${String(height)}px` }}
    src={icon}
    alt={alt}
  />
);
TemplateIcon.defaultProps = {
  alt: 'Картинка',
  width: '24',
  height: '24',
  className: '',
};

export default TemplateIcon;
