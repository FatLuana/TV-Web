import { createContext, MutableRefObject, ReactNode, useEffect, useRef, useState } from "react";

interface HomeContextDate {
    videoRef: MutableRefObject<HTMLVideoElement>;
    canvasRef: MutableRefObject<HTMLCanvasElement>;
    imagensRef: MutableRefObject<HTMLDivElement>;
    video: string;
    isPlaying: boolean;
    isMute: boolean;
    volume: number;
    tempoCorrente: number;
    tempoTotal: number;
    filtro,
    alternarPausaDeReprodução: () => void;
    configurarMute: () => void;
    configurarVolume: (volume: number) => void;
    configTempoCorrente: (time: number) => void;
    setFiltro: (filtro: string) => void;
    configFiltro: () => void;

}

interface HomeContextProviderProps {
    children: ReactNode;
}

interface Pixel {
    vermelho: number;
    verde: number;
    azul: number;
}

interface CalcularFiltro {
    executa(vermelho: number, verde: number, azul: number): Pixel;
}

class Pretoebranco implements CalcularFiltro {
    executa(vermelho: number, verde: number, azul: number): Pixel {
        const media = (vermelho + verde + azul) / 3;
        const pixel: Pixel = { vermelho: media, verde: media, azul: media };
        return pixel;
    }
}

class Vermelho implements CalcularFiltro {
    executa(vermelho: number, verde: number, azul: number): Pixel {
        const pixel: Pixel = { vermelho: vermelho, verde: 0, azul: 0 };
        return pixel;
    }
}

class Azul implements CalcularFiltro {
    executa(vermelho: number, verde: number, azul: number): Pixel {
        const pixel: Pixel = { vermelho: 0, verde: 0, azul: azul };
        return pixel;
    }
}

class Verde implements CalcularFiltro {
    executa(vermelho: number, verde: number, azul: number): Pixel {
        const pixel: Pixel = { vermelho: 0, verde: verde, azul: 0 };
        return pixel;
    }
}


class FiltroNormal implements CalcularFiltro {
    executa(vermelho: number, verde: number, azul: number): Pixel {
        return { vermelho: vermelho, verde: verde, azul: azul };
    }
}

export const HomeContext = createContext({} as HomeContextDate);

export const HomeContextProvider = ({ children }: HomeContextProviderProps) => {
    //fazer uma referencia para o vidio para poder manipular
    // useRef - referencia que permite ter acesso a algum elemento da página
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagensRef = useRef<HTMLDivElement>(null);
    const [video, setVideo] = useState<string>("");
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isMute, setIsMute] = useState<boolean>(false);
    const [volume, setVolume] = useState(1);
    const [ultimoVolume, setUltimoVolume] = useState<number>(1);
    const [tempoCorrente, setTempoCorrente] = useState(0);
    const [tempoTotal, setTempoTotal] = useState(0);
    const [filtro, setFiltro] = useState("normal");
    const [calcularFiltro, setCalcularFiltro] = useState<CalcularFiltro>();


    useEffect(() => {
        configuracaoVideo("./videos/video2.mp4");

    }, []);

    var contar = 0;
    const draw = () => {
  
        const playingVideo = videoRef.current;
        //Analisa se o video estar pausado ou finalizado, pois assim não poderá fazer o desenho. 
        if (playingVideo.paused || playingVideo.ended) return;
        const canvas = canvasRef.current;
        const contexto = canvas.getContext("2d");
        const x = 0;
        const y = 0;

        //desenhando a imagem em todo canvas
        contexto.drawImage(playingVideo, x, y, canvas.width, canvas.height);

        if (calcularFiltro != null) {

            const imageDate = contexto.getImageData(x, y, canvas.width, canvas.height);
            const data = imageDate.data;

            for (var i = 0; i < data.length; i += 4) {
                const vermelho = data[i];
                const verde = data[i + 1];
                const azul = data[i + 2];

                const pixel: Pixel = calcularFiltro.executa(vermelho, verde, azul);

                data[i] = pixel.vermelho;
                data[i + 1] = pixel.verde;
                data[i + 2] = pixel.azul;
            }
            contexto.putImageData(imageDate, x, y);
        }

        if (contar++ % 400 == 0 && contar > 10) {
            const imagem = new Image();
            const imagemURL = canvas.toDataURL("imagens/png");
            imagem.src = imagemURL;
            imagensRef.current.appendChild(imagem);
        }
        //   atualiza o quadro de animações. O navegador ira chamar sempre essa função para fazer o redesenho. 
        requestAnimationFrame(draw);
    }

    const configuracaoVideo = (videourl: string) => {
        setVideo(videourl);

        const video = videoRef.current;
        video.onloadedmetadata = () => {
            setTempoTotal(video.duration);
        }
        video.ontimeupdate = () => {
            setTempoCorrente(video.currentTime);
        }
    }

    const alternarPausaDeReprodução = () => {
        const updatadIsplaying = !isPlaying;
        if (isPlaying) {
            pause();
        } else {
            play();
        }
        setIsPlaying(updatadIsplaying);
    }

    const play = () => {
        const audio = videoRef.current;
        audio.play();
        draw();
    }
    const pause = () => {
        const audio = videoRef.current;
        audio.pause();
    }

    const configurarMute = () => {
        const atualizarMutado = !isMute;
        const video = videoRef.current;
        video.muted = atualizarMutado;
        setIsMute(atualizarMutado);
        if (atualizarMutado) {
            setUltimoVolume(volume);
            video.volume = 0;
            setVolume(0);
        } else {
            video.volume = ultimoVolume;
            setVolume(ultimoVolume);
        }
    }

    const configurarVolume = (value: number) => {
        const video = videoRef.current;
        video.volume = value;
        setVolume(value);
        if (value == 0) {
            video.muted = true;
            setIsMute(true);
        } else {
            video.muted = false;
            setIsMute(false);
        }
    }

    const configTempoCorrente = (time: number) => {
        const video = videoRef.current;
        video.currentTime = time;
        setTempoCorrente(time);
    }

    const configFiltro = () => {

        if (filtro === "vermelho") {
            setCalcularFiltro(new Vermelho());
        }
        else if (filtro === "verde") {
            setCalcularFiltro(new Verde());
        }
        else if (filtro === "azul") {
            setCalcularFiltro(new Azul());
        }
        else if (filtro == "preto e branco") {
            setCalcularFiltro(new Pretoebranco());
        } else {
            setCalcularFiltro(null);
        }
        draw();
    }

    return (
        <HomeContext.Provider value={
            {
                videoRef,
                video,
                isPlaying,
                isMute,
                volume,
                tempoTotal,
                imagensRef,
                tempoCorrente,
                canvasRef,
                filtro,
                setFiltro,
                alternarPausaDeReprodução,
                configurarMute,
                configurarVolume,
                configTempoCorrente,
                configFiltro
            }
        }>
            {
                children
            }
        </HomeContext.Provider>

    );
}