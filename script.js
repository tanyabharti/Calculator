
class Calculator{
    constructor(prevOperandText,currOperandText){
        this.prevOperandText=prevOperandText;
        this.currOperandText=currOperandText;
        this.clear();
    }

    //clear
    clear(){
        this.currOperand = "";
        this.prevOperand = "";
        this.operation = undefined;
    }
    //delete
    delete(){
        this.currOperand=this.currOperand.toString().slice(0 ,-1);

    }
    //appending operands and numbers 
    appendNumber(num){
        if(num=== "." && this.currOperand.includes(".")) return;
        this.currOperand =  this.currOperand.toString()+ num.toString();

    }
    //selecting operators
    selectOperator(operator){

        if(this.currOperand ==="") return ;
        if(this.prevOperand !== ""){
            this.compute();
        }
        this.operation= operator;
        this.prevOperand=this.currOperand;
        this.currOperand="";

    }

   
    // computing the result after selection of operands and operators 
    compute(){
        let result ;
        const previous = parseFloat(this.prevOperand);
        const current = parseFloat(this.currOperand);
        if(isNaN(previous) || isNaN(current)) return;
        
        switch(this.operation){
            case "+" :
               result = previous + current ;
                break;
            case "-" :
               result = previous - current ;
                break;
            case "X" :
                result = previous * current ;
                break;
            case "÷" :
                result = previous / current ;
                break;
           
            default:
                break;
        }
        this.currOperand=result;
        this.operation=undefined;
        this.prevOperand="";


    }
    
     //displaying string in local format using ToLocaleString Method
    getDisplayNumber(number){
        const stringNum = number.toString();
        const numArray =stringNum.split(".");
        const intDigits= parseFloat(numArray[0]);
        const decDigits=numArray[1];
        let intDisplay;
        if(isNaN(intDigits)){
            intDisplay="";
        }else{
            intDisplay =intDigits.toLocaleString("en", {
                maximumFractionDigts : 0 ,
            });
        }
        if(decDigits!=null){
            return ` ${intDisplay}.${decDigits}`;

        }else{
           return  intDisplay ;
        }
        return parseFloat(number).toLocaleString("en")
    }
    //display operations
    updateDisplay(){
        this.currOperandText.innerText= this.getDisplayNumber(this.currOperand);
        if(this.operation!=null){
            this.prevOperandText.innerText= `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`;
        }else{
            this.prevOperandText.innerText=this.getDisplayNumber(this.prevOperand);
        }
        

    }

}


//variables to select HTML Elements using  query selector
const numbutton = document.querySelectorAll("[number]");
const operator = document.querySelectorAll("[operator]");
const equal = document.querySelector("[equal]");
const deletebutton = document.querySelector("[delete]");
const allClear = document.querySelector("[clear]");

const prevOperandText = document.querySelector("[prev-operand]");
const currOperandText = document.querySelector("[curr-operand]");


document.addEventListener("DOMContentLoaded",()=>{
    // CLASS INSTANCE
    const calc = new Calculator(prevOperandText,currOperandText);
    // passing  appended number to AppendNumber function on clicking number buttons using for each loop and Add event lsitener method
    numbutton.forEach( (button) =>{
        button.addEventListener("click", () => {
            // console.log(button.innerText);
            calc.appendNumber(button.innerText);
            calc.updateDisplay();
         });
     });

    operator.forEach((button) => {
        button.addEventListener("click" , () =>{
            // console.log(button.innerText);
            calc.selectOperator(button.innerText);
            calc.updateDisplay();

        }) ;
    });
    
    equal.addEventListener("click", () =>{
        calc.compute();
        calc.updateDisplay();
    });
    deletebutton.addEventListener("click", () =>{
        calc.delete();
        calc.updateDisplay();
    });
     allClear.addEventListener("click", ()=>{
        calc.clear();
        calc.updateDisplay();
     })

    });





