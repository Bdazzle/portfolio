interface JSONLDProps {
    data : Record<string, any>
}

const JSONLD : React.FC<JSONLDProps> = ({data} ) =>{
    return(
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data)}}>
        </script>
    )
}

export default JSONLD