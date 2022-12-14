export const menus = [
    {
        id:0,
        text:"Tablero",
        iconClass:"bi bi-grid",
        path:"/",
        hasChild:false,
        parent_id:null,
        target:null
    },
    {
        id:1,
        text:"Usuarios",
        iconClass:"bi bi-person",
        path:"/users/list",
        hasChild:false,
        parent_id:null,
        target:null
    },
    {
        id:2,
        text:"Contactos",
        iconClass:"bi bi-person-lines-fill",
        path:"/contacts/list",
        hasChild:false,
        parent_id:null,
        target:null
    },
    {
        id:3,
        text:"Clientes",
        iconClass:"bi bi-people",
        path:"/partner/list",
        hasChild:false,
        parent_id:null,
        target:null
    },
    {
        id:4,
        text:"Contratos",
        iconClass:"bi bi-file-earmark-medical",
        path:"/contracts/list",
        hasChild:false,
        parent_id:null,
        target:null
    },
    {
        id:5,
        text:"Perfil",
        iconClass:"bi bi-person",
        path:"/users/profile",
        hasChild:false,
        parent_id:null,
        target:null
    }
];

export const notifications = [
  {
    severity: "warning",
    title: "Lorem Ipsum",
    notification: "Quae dolorem earum veritatis oditseno",
    timeElapsed: "30 min. ago"
  },
  {
    severity: "danger",
    title: "Atque rerum nesciunt",
    notification: "Quae dolorem earum veritatis oditseno",
    timeElapsed: "1 hr. ago"
  },
  {
    severity: "success",
    title: "Sit rerum fuga",
    notification: "Quae dolorem earum veritatis oditseno",
    timeElapsed: "2 hrs. ago"
  },
  {
    severity: "primary",
    title: "Dicta reprehenderit",
    notification: "Quae dolorem earum veritatis oditseno",
    timeElapsed: "4 hrs. ago"
  },
];

export const messages = [
    {
        from: "Maria Hudson",
        message: "Velit asperiores et ducimus soluta repudiandae labore officia est ut...",
        timeElapsed: "4 hrs. ago",
        photo: "/messages-1.jpg"
    },
    {
        from: "Anna Nelson",
        message: "Velit asperiores et ducimus soluta repudiandae labore officia est ut...",
        timeElapsed: "6 hrs. ago",
        photo: "/messages-2.jpg"
    },
    {
        from: "David Muldon",
        message: "Velit asperiores et ducimus soluta repudiandae labore officia est ut...",
        timeElapsed: "8 hrs. ago",
        photo: "/messages-3.jpg"
    }
];