import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as GiIcons from 'react-icons/gi'; // Importing for GiClothes
import { IoIosHome } from 'react-icons/io'; 

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiOutlineShoppingCart />, 
    cName: 'nav-text'
  },
  {
    title: 'Furniture',
    path: '/Furniture',
    icon: <IoIosHome />, // Using custom icon
    cName: 'nav-text'
  },
  {
    title: 'Fashion',
    path: '/Fashion',
    icon: <GiIcons.GiClothes />, // Using custom icon
    cName: 'nav-text'
  }, 
];
