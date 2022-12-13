import './styles/style-vis.css'

function LabelView({ sentence, labels }) {    

    if(labels.length == 0) {
        return <p>{sentence}</p>
    } else {
        return <div id='bratcanvas'></div>
    }
}

export default LabelView