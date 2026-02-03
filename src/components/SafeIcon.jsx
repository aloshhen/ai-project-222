import React from 'react';
import * as Icons from 'lucide-react';

const SafeIcon = ({ name, size = 24, className = '', color }) => {
  try {
    const iconName = name.split('-').map(part => 
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join('') + 'Icon';
    
    const IconComponent = Icons[iconName] || Icons.HelpCircleIcon;
    
    return (
      <IconComponent 
        size={size} 
        className={className} 
        color={color}
      />
    );
  } catch (error) {
    return <Icons.HelpCircleIcon size={size} className={className} />;
  }
};

export default SafeIcon;