import './css/filters.css';
const Filresult = (Articles) => {
    Articles = JSON.parse(Articles.Articles);
  
    const Article = (props) => {
        const dimg = props.db;
        const vdimg = "0 0 "+(parseInt(props.dw)+1)+" "+(parseInt(props.dh)+1);
        const mimg = props.mb;
        const vmimg = "0 0 "+(parseInt(props.mw)+1)+" "+(parseInt(props.mh)+1);
        return (
            <>
            <a href={props.url}>
                <div className="backimg mhide" style={{ backgroundImage: `url(${dimg})` }}>
                    <svg className="transparent_svg" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox={vdimg}>
                        <rect className="cls-1" x="0.5" y="0.5" width={props.dw} height={props.dh}></rect>
                    </svg>
                </div>
                <div className="backimg mview" style={{ backgroundImage: `url(${mimg})` }}>
                    <svg className="transparent_svg" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox={vmimg}>
                        <rect className="cls-1" x="0.5" y="0.5" width={props.mw} height={props.mh}></rect>
                    </svg>
                </div>
                <div className="recipe_title">
                    <h3>{props.title}</h3>
                </div>
            </a>
            </>
        )
    };

    const itemCls = (count) => {
        let clsOneS = [0];
        let clsTwoS = [3];
        let clsThreeS = [4];
        let clsFourS = [7];
        for(let i=0; i<=count; i++){
            if(i > 0){
                let y_oneS = parseInt(9*i);
                let y_twoS = parseInt(y_oneS+3);
                let y_threeS = parseInt(y_oneS+4);
                let y_fourS = parseInt(y_oneS+7);
                if((y_oneS <= count) && (y_twoS <= count) && (y_threeS <= count) && (y_fourS <= count)){
                    clsOneS.push(y_oneS);
                    clsTwoS.push(y_twoS);
                    clsThreeS.push(y_threeS);
                    clsFourS.push(y_fourS);
                }else{
                    break;
                }
            }
        }
        return[clsOneS, clsTwoS, clsThreeS, clsFourS];
    };
    
    const RowOne = (props) => {
        let articleOne = props.row[0];
        return (
            <>
            <div className="recipe_items_inner viewtwo">
                <div className="full_banner">
                    <Article 
                        title={articleOne.title}
                        url= {articleOne.onlineStoreUrl}
                        dw="1500"
                        dh="750"
                        db={((articleOne.image === undefined) || (articleOne.image === 'undefined') || (articleOne.image === null)) ? 'https://cdn.shopify.com/s/files/1/0524/2113/2440/files/placeholder_16c659a0-827a-47df-be00-b4d924703a72.png' : articleOne.image.url}
                        mw="1500"
                        mh="849"
                        mb={((articleOne.image === undefined) || (articleOne.image === 'undefined') || (articleOne.image === null)) ? 'https://cdn.shopify.com/s/files/1/0524/2113/2440/files/placeholder_16c659a0-827a-47df-be00-b4d924703a72.png' : articleOne.image.url}
                    />
                </div>
            </div>
            </>
        )
    }

    const RowTwo = (props) => {
        let articleOne = props.row[0];
        let articleTwo = props.row[1];
        return (
            <>
            <div className="recipe_items_inner viewtwo">
                <div className="half_banner">
                    <div className="inner_half_banner">
                        <Article 
                            title={articleOne.title}
                            url={articleOne.onlineStoreUrl}
                            dw="750"
                            dh="500"
                            db={((articleOne.image === undefined) || (articleOne.image === 'undefined') || (articleOne.image === null)) ? 'https://cdn.shopify.com/s/files/1/0524/2113/2440/files/placeholder_16c659a0-827a-47df-be00-b4d924703a72.png' : articleOne.image.url}
                            mw="1500"
                            mh="849"
                            mb={((articleOne.image === undefined) || (articleOne.image === 'undefined') || (articleOne.image === null)) ? 'https://cdn.shopify.com/s/files/1/0524/2113/2440/files/placeholder_16c659a0-827a-47df-be00-b4d924703a72.png' : articleOne.image.url}
                        />
                    </div>
                    <div className="inner_half_banner">
                        <Article 
                            title={articleTwo.title}
                            url={articleTwo.onlineStoreUrl}
                            dw="750"
                            dh="500"
                            db={((articleTwo.image === undefined) || (articleTwo.image === 'undefined') || (articleTwo.image === null)) ? 'https://cdn.shopify.com/s/files/1/0524/2113/2440/files/placeholder_16c659a0-827a-47df-be00-b4d924703a72.png' : articleTwo.image.url}
                            mw="1500"
                            mh="849"
                            mb={((articleTwo.image === undefined) || (articleTwo.image === 'undefined') || (articleTwo.image === null)) ? 'https://cdn.shopify.com/s/files/1/0524/2113/2440/files/placeholder_16c659a0-827a-47df-be00-b4d924703a72.png' : articleTwo.image.url}
                        />
                    </div>
                </div>
            </div>
            </>
        )
    }

    const RowThree = (props) => {
        let articleOne = props.row[0];
        let articleTwo = props.row[1];
        let articleThree = props.row[2];
        return (
            <>
            <div className="recipe_items_inner viewone">
                 <div className="full_banner">
                     <Article 
                        title={articleOne.title}
                        url={articleOne.onlineStoreUrl}
                        dw="1500"
                        dh="750"
                        db={((articleOne.image === undefined) || (articleOne.image === 'undefined') || (articleOne.image === null)) ? 'https://cdn.shopify.com/s/files/1/0524/2113/2440/files/placeholder_16c659a0-827a-47df-be00-b4d924703a72.png' : articleOne.image.url}
                        mw="1500"
                        mh="849"
                        mb={((articleOne.image === undefined) || (articleOne.image === 'undefined') || (articleOne.image === null)) ? 'https://cdn.shopify.com/s/files/1/0524/2113/2440/files/placeholder_16c659a0-827a-47df-be00-b4d924703a72.png' : articleOne.image.url}
                    />
                </div>
                <div className="half_banner">
                    <div className="inner_half_banner">
                        <Article 
                            title={articleTwo.title}
                            url={articleTwo.onlineStoreUrl}
                            dw="750"
                            dh="500"
                            db={((articleTwo.image === undefined) || (articleTwo.image === 'undefined') || (articleTwo.image === null)) ? 'https://cdn.shopify.com/s/files/1/0524/2113/2440/files/placeholder_16c659a0-827a-47df-be00-b4d924703a72.png' : articleTwo.image.url}
                            mw="1500"
                            mh="849"
                            mb={((articleTwo.image === undefined) || (articleTwo.image === 'undefined') || (articleTwo.image === null)) ? 'https://cdn.shopify.com/s/files/1/0524/2113/2440/files/placeholder_16c659a0-827a-47df-be00-b4d924703a72.png' : articleTwo.image.url}
                        />
                    </div>
                    <div className="inner_half_banner">
                        <Article 
                            title={articleThree.title}
                            url={articleThree.onlineStoreUrl}
                            dw="750"
                            dh="500"
                            db={((articleThree.image === undefined) || (articleThree.image === 'undefined') || (articleThree.image === null)) ? 'https://cdn.shopify.com/s/files/1/0524/2113/2440/files/placeholder_16c659a0-827a-47df-be00-b4d924703a72.png' : articleThree.image.url}
                            mw="1500"
                            mh="849"
                            mb={((articleThree.image === undefined) || (articleThree.image === 'undefined') || (articleThree.image === null)) ? 'https://cdn.shopify.com/s/files/1/0524/2113/2440/files/placeholder_16c659a0-827a-47df-be00-b4d924703a72.png' : articleThree.image.url}
                        />
                    </div>
                </div>
            </div>
            </>
        )
    }

    const splitArrayIntoChunks = (arr, len) => {
        var chunks = [], i = 0, n = arr.length;
        let [clsOneS, clsTwoS, clsThreeS, clsFourS] = itemCls(n);
        while (i < n) {
            if(clsOneS.includes(i)){
                len=3;
            }else if(clsTwoS.includes(i)){
                len=1;
            }else if(clsThreeS.includes(i)){
                len=3;
            }else if(clsFourS.includes(i)){
                len=2;
            }
            chunks.push(arr.slice(i, i += len));
        }
        return chunks;
    }

    const ElementsHTML = (Articles) => {
        let length = (Articles.Articles.length > 3) ? 3 : Articles.Articles.length;
        let chunks = splitArrayIntoChunks(Articles.Articles,length);
        const html = chunks.map((row) =>{
            const Ele = () => {
                if(row.length === 1){
                    return <RowOne row={row} />
                }else if(row.length === 2){
                    return <RowTwo row={row} />
                }else if(row.length === 3){
                    return <RowThree row={row} />
                }
            }
            return(
                <>
                    <Ele />
                </>
            )
        });
        return html;
    }

    return (
        <>
            <ElementsHTML Articles={Articles} />
        </>
    );
}

export default Filresult;