import loading from './loading.svg'
const Spinner = () => <div style={{
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: 'white',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
}}>
    <img src={loading} alt='Loading' />
</div>

export const OverlaySpinner = () => (
    <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    }}>
        <img src={loading} alt='Loading' />
    </div>
)

export default Spinner
