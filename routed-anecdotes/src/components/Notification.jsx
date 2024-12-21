const Notification = ({msg}) => {
    if (msg!=='' && msg) {
        return (
            <div>
                <p>{msg}</p>
            </div>
        )
    }
    else {
        return null
    }
}

export default Notification