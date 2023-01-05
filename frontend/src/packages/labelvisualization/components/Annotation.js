import '../styles/annotation.css'

import labeltypes from '../util/labeltypes'

const labeltypeheight = 16
const labelbuffer = 6; // distance between the span and the label
const spanpadding = 2;

function Annotation({ x, width, y, type }) { 
    const textlength = (text) => {
        // calculates the length of a monospaced text
        return text.length * 6.6
    }
    const labeltype = labeltypes.filter(l => l.label === type)[0];
    const labelstring = (width < textlength(type)+2) ? labeltype.short : type;
    const color = labeltype.color;
    const level = parseInt(labeltype.level);

    /* calculated heights */
    const y_span = y-level*spanpadding
    const y_label = level === 0 ? labeltypeheight+(labelbuffer/2) : 1
    const y_type = y-labelbuffer-labeltypeheight*level-3-(2*level);

    const getstartposition = () => { 
        return parseInt(x + width/2- (textlength(labelstring)/2))
    } 

    return (
        <g>
            <g className="annotation">
                <rect className="label" x={x} y={y_label} width={width} height={labeltypeheight} rx="2" stroke="#000000" fill={color}>
                    <title>{type}</title>
                </rect>
                <text className="labeltype" x={getstartposition()} y={y_type} fill="#000000">{labelstring}</text>

                <rect className="span" x={x-level*spanpadding} y={y_span} width={width+level*2*spanpadding} height={18+level*2*spanpadding} rx="1" fill={color}></rect>
            </g>
        </g>
    );
}

export default Annotation;