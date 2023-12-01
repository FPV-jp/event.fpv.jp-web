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
export default Spinner