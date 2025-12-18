export function toDateTimeLocal(dateValue: string){
    if(!dateValue) return "";
    const newDate = new Date(dateValue);
    return newDate.toISOString().slice(0,16);
}

  /* eslint-disable @typescript-eslint/no-explicit-any */
  export function diff(
    original: any,
    updated: any
  ): any {
    const result: any = {};
  
    for (const key of Object.keys(updated)) {
      const origVal = original[key];
      const newVal = updated[key];
  
      if (
        typeof newVal === "object" &&
        newVal !== null &&
        !Array.isArray(newVal)
      ) {
        const nested = diff(
          (origVal as any) ?? {},
          newVal as any
        );
  
        if (Object.keys(nested).length > 0) {
          result[key] = nested;
        }
      } else if (newVal !== origVal) {
        result[key] = newVal;
      }
    }
  
    return result;
  }



  