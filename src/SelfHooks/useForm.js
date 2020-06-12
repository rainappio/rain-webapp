import React, { useState } from 'react';

/* 
   Date   : 2020-06-04 14:45:08
   Author : Arhua Ho
   Content: input 輸入欄位控制與驗證
   @Param : initialValue ； 參數值 : 欄位初始值  
   @Param : regExp ； 參數值 : 檢核欄位的正則表達式   
   @return : [Value, handlerChange, Regtext] ； 回傳值 : [欄位當前值, 輸入時改變值的函數, 測試結果與錯誤訊息]
*/

export const useForm = (initialValue, regExp) => {

    const [Value, setValue] = useState(initialValue);

    return [Value, (e) => { setValue(e.target.value) }, RegExp(regExp).test(Value) ? null : "驗證失敗"]
}