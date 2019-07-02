const styles = {
    container: {
        background: '#efefef',
        overflowY: 'auto'
        // height: '100vh',
        // width: '100vw',
        // marginTop: 64
    },   
    cell: (widthQuota) => {
        return {
            display: "flex",
            flex: `${widthQuota} 1 0%`,
            height: "48px",
            overflowY: "hidden",
            JustifyContent: 'center',
            alignItems: 'center',
            fontSize: '14px',
        }
    }
}


export const mix = (s1, s2) => {
    return Object.assign({}, s1, s2);
}


export default styles