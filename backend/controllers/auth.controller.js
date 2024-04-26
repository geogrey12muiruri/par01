export const signup  = async (req, res) => {
    res.json({ data: 'you hit the signup end point' });
}

export const login = async (req, res) => {
    res.json({ data: 'you hit the signin end point' });
}

export const logout = async (req, res) => {
    res.json({ data: 'you hit the signout end point' });
}

export const forgotPassword = async (req, res) => {
    res.json({ data: 'you hit the forgot-password end point' });
}

export const resetPassword = async (req, res) => {
    res.json({ data: 'you hit the reset-password end point' });
}
