//SweetAlert2 Config
//creates configurations for SweetAlert2 Messages with minimal arguments.
class SwalConfig{
    constructor({error, success, text, title, large, isHtml}){
        

        this.title =  title? title: (error? 'Error' : (success? 'Success': null ))
        this.icon =  error? 'error' : (success? 'success': null )
        
        if(isHtml){
            this.html = text? text: (error? 'An error has occurred': null)
        }
        else{            
            this.text = text? text: (error? 'An error has occurred': null)
        }
        this.confirmButtonText = 'Continue'
        this.toast= large? false : true
        this.position = large? 'center' : 'bottom-end'
    }
}

export {SwalConfig}
export default SwalConfig