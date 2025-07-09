export function debounceFunction (func, delay) {
    let timeRef = null;
    const context = this
    return function (){
        clearTimeout(timeRef);
        const args = arguments
        timeRef = setTimeout(()=>{
            console.log(...args);
            
            func(...args);
        },delay);
    }
}