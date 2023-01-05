import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import style from "../css/dropzone.module.css"
import {SlPaperClip} from "react-icons/sl"


export default function Dropzone({setImage, onError, setOnError}) {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [onSuccess, setOnSuccess] = useState(false)


	
	const onDrop = useCallback((acceptedFile, rejectedFile) => {
		acceptedFile.forEach((e) => {
			setIsLoading(true)
			const reader = new FileReader()
			reader.onprogress = (e) => setProgress(Math.round(e.loaded * 100 / e.total))
			reader.onerror = () => setOnError(true)
			reader.onload = (e) => {
				setImage(e.target.result)
				setIsLoading(false)
				const localStorage = window.localStorage.getItem("movies")
				if (localStorage?.length < 4000000 || !localStorage) {
					setOnSuccess(true)
				} else {
					setOnError(true)
				}
			}
      		reader.readAsDataURL(e) 
    	})

		rejectedFile.forEach((e) => {
			setOnError(true)
		})
	}, [setImage, setOnError])

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		multiple: false,
		accept: {'image/*': ['.jpeg', '.jpg', '.png']},
	})

	return(
		<div className="root">
			{ isLoading ? (
				<div>
					<div className={style.textLoading}> Cargando <b>{progress}%</b></div>
					<div style={{"color":"#64EEBC", "height": "8px", "margin": "2% 0", "width":`${progress}`}}></div>
					<div onClick={() => setIsLoading(false)} className={style.textBar1}> Cancelar </div>
				</div>

			) : onError ? (
				<div>
					<div className={style.textLoading}> <b className={style.space}>¡ERROR!</b> No se pudo cargar la película </div>
					<div className={style.barFail}></div>
					<div onClick={() => setOnError(false)}  className={style.textBar1}> Reintentar </div>
				</div>

			) : onSuccess ? (
				<div>
					<div className={style.textLoading}> 100% Cargado </div>
					<div className={style.barSuccess}></div>
					<div className={style.textBar}> ¡Listo! </div>
				</div>

			) : (
				<div {...getRootProps({ className: 'dropzone' })}>
					<input {...getInputProps()} />
					<div className={`dropzone__helper ${style.container}`}>
						<div className={style.drop}>
							<SlPaperClip className={style.icon}/>
							<p className={style.pointer}><b>Agregá un archivo</b> o arrastralo y soltalo aquí</p>
							<p className={style.pointerResponsive}>Agregá un archivo</p>
						</div>
					</div>
				</div>
			)}

		</div>
	)
}