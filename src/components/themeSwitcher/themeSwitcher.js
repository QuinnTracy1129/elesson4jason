import React from 'react';

export default ({ config, changeTheme, selectedId }) => {
  const { id, options, label } = config;
  return (
    <div className="themeSwitchBlock">
      <h4>{label}</h4>
      <div className="themeSwitchBtnWrapper">
        {options.map(option => {
          const { themeName, buttonColor } = option;
          const onClick = () => changeTheme(id, themeName);
          const customClass = themeName === selectedId ? 'selectedTheme' : '';
          return (
            <button
              type="button"
              key={themeName}
              onClick={onClick}
              className={customClass}
              style={{ backgroundColor: buttonColor }}
            />
          );
        })}
      </div>
    </div>
  );
};
