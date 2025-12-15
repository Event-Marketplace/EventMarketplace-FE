export function toDateTimeLocal(dateValue: string){
    if(!dateValue) return "";
    const newDate = new Date(dateValue);
    return newDate.toISOString().slice(0,16);
}

export function diff(original: any, updated: any): any {
    const result: any = {};
  
    for (const key in updated) {
      const origVal = original[key];
      const newVal = updated[key];
  
      if (typeof newVal === "object" && newVal !== null) {
        const nested = diff(origVal ?? {}, newVal);
        if (Object.keys(nested).length > 0) {
          result[key] = nested;
        }
      } else {
        if (newVal !== origVal) {
          result[key] = newVal;
        }
      }
    }
  
    return result;
  }