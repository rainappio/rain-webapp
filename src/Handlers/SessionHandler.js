import React from 'react'

/* 
   Date   : 2020-06-07 16:28:28
   Author : Arhua Ho
   Content: sessionStorage操作封裝，包含setItem、getItem、removeItem、clear
   @return : { setItem, getItem, removeItem, clear } ； 回傳值 : { setItem, getItem, removeItem, clear }
*/

const setItemSession = (itemName, item) => {
    sessionStorage.setItem(itemName, item);
};

const getItemSession = (itemName) => {
    return sessionStorage.getItem(itemName);
};

const removeItemSession = (itemName) => {
    sessionStorage.removeItem(itemName);
};

const clearSession = () => {
    sessionStorage.clear();
};

export { setItemSession, getItemSession, removeItemSession, clearSession };