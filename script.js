const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll("[data-operation]")
const equalButton = document.querySelector("[data-equals]")
const deleteButton = document.querySelector("[data-delete]")
const allClearButton = document.querySelector("[data-all-clear]")
const prevOperandTextElement = document.querySelector("[data-prev-operand]")
const currOperandTextElement = document.querySelector("[data-curr-operand]")
const calculator = new Calculator (prevOperandTextElement, currOperandTextElement)


class Calculator
{
    constructor (prevOperandTextElement, currOperandTextElement)
    {
        this.prevOperandTextElement = prevOperandTextElement
        this.currOperandTextElement = currOperandTextElement
        this.clear()
    }

    clear()
    {
        this.currOperand = ''
        this.prevOperand = ''
        this.operation = undefined
    }

    delete()
    {
        this.currOperand = this.currOperand.toString().slice(0, -1)
    }

    appendNumber(number)
    {
        if (number === "." && this.currOperand.includes(".")) return 
        this.currOperand = this.currOperand.toString() + number.toString()
    }

    chooseOperation(operation)
    {

        if (this.currOperand == '') return
        
        if (this.prevOperand !== "")
        {
            this.compute()
        }
        
        // if you choose the operator the values in the current output are passed to the previous output
        // and the value of the current is declared to be nothing
        
        this.operation = operation
        this.prevOperand = this.currOperand
        this.currOperand = ""
    }

    compute()
    {
        let computation
        const prev = parseFloat(this.prevOperand)
        const curr = parseFloat(this.currOperand)

        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation)
        {
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            case '*':
                computation = prev * curr
                break
            case '1':
                computation = prev / curr
                break
            case '%':
                computation = prev % curr
                break
            default:
                return
        }
        
        this.currOperand = computation
        this.operation = undefined
        this.prevOperand = ""
    }

    getDisplayNumber(number)
    {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split(".")[0])
        const decimalDigits = stringNumber.split(".")[1]
        let integerDisplay

        if (isNan(integerDigits))
        {
            integerDisplay = ''
        }
        else
        {
            integerDisplay = integerDigits.toLocaleString("en",
            {
                maximumFractionDigits: 0
            })
        }

        if (decimalDigits != null)
        {
            return `${integerDisplay}.${decimalDigits}`
        }
        else
        {
            return integerDisplay
        }
    }

    updateDisplay()
    {
        this.currOperandTextElement.innerText = this.getDisplayNumber(this.currOperand)
        if (this.operation != null)
        {
            this.prevOperandTextElement.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`
        }
        else
        {
            this.prevOperandTextElement.innerText = ""
        }
    }
}

numberButtons.forEach(button =>
{
    button.addEventListener("click", () =>
    {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button =>
{
    button.addEventListener("click", () =>
    {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener("click", button =>
{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener("click", button =>
{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener("click", button =>
{
    calculator.delete()
    calculator.updateDisplay()
})
