const mockPosts = [
    {
        name: "John Doe",
        username: "100",
        domain: "pbx.com",
        password: "XXXXXX",

        proxy: "192.168.100.1:5060",
        transport: "UDP",
        regServer: "pbx.com",
        regTimeout: 300,
    },
    {
        name: "Marie Curie",
        username: "101",
        domain: "pbx.com",
        password: "XXXXXX",

        proxy: "192.168.100.2:5060",
        transport: "UDP",
        regServer: "pbx.com",
        regTimeout: 300,
    }
];

export function getAccounts() {
    return {
        type: 'FETCH_ACCOUNTS',
        payload: mockPosts
    };
}
