const size = {
    /* 
       Date   : 2020-05-18 14:06:31
       Author : Arhua Ho
       Content: 可在此修改裝置寬度，
                移動端寬度:
                    iphone5/SE :320px 
                    iphone6/7/8/X : 375px
                    iphone6+/7+/8+ : 414px
                    ipad : 768px
                    ipad pro : 1024px
    */

    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '1920px',
    desktopL: '2560px',

    /* 
       Date   : 2020-05-22 14:03:07
       Author : Arhua Ho
       Content: 旋轉寬度
    */
}

const mediaQuery = {
    mobileS: `(min-width: ${size.mobileS})`,
    mobileM: `(min-width: ${size.mobileM})`,
    mobileL: `(min-width: ${size.mobileL})`,
    tablet: `(min-width: ${size.tablet})`,
    laptop: `(min-width: ${size.laptop})`,
    laptopL: `(min-width: ${size.laptopL})`,
    desktop: `(min-width: ${size.desktop})`,
    desktopL: `(min-width: ${size.desktopL})`,

    /* 
       Date   : 2020-05-22 13:57:00
       Author : Arhua Ho
       Content: 手機橫放
    */
   mobileLSpin: `(orientation: landscape) and (max-height: ${size.mobileL})`,
}

export {
    size,
    mediaQuery
}
