"use client"
export const store = (storageKey: string, value: any) => {
    // encrypt the value
    const encryptedValue = btoa(escape(JSON.stringify(value)));
    //const encryptedValue = JSON.stringify(value);
     localStorage.setItem(storageKey, encryptedValue);
}

export const get = (storageKey: string) => {
    const res =  localStorage.getItem(storageKey);
    if (res) {
        // decrypt the value
        return JSON.parse(unescape(atob(res)));
        //return JSON.parse(res);
    } else {
        return false;
    }
}

export const removeItem =  (storageKey: string) => {
     localStorage.removeItem(storageKey);
}

export const clear =  () => {
     localStorage.clear();
}

//export default storage