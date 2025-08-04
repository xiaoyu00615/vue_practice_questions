function switchPage(router,path) {
    router.push({
        path:"/" + path,
        query:{

        }
    })
}

export{
    switchPage
}