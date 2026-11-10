// Central Icons, round outlined, radius 2, stroke 1.5.
import type { SVGProps } from "react"

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function base({ size = 20, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true,
    focusable: false,
    ...props,
  } as const
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M8 10L11.2929 13.2929C11.6834 13.6834 12.3166 13.6834 12.7071 13.2929L16 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7.75 12.9231L10.5625 15.75L15.25 8.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function MoonIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.9319 21.9993 11.8639 21.998 11.7962C21.9924 11.5186 21.834 11.2669 21.5862 11.1417C21.3384 11.0166 21.0418 11.0385 20.8151 11.1988C19.8784 11.861 18.7358 12.25 17.5 12.25C14.3244 12.25 11.75 9.67564 11.75 6.5C11.75 5.26425 12.139 4.12157 12.8012 3.18485C12.9615 2.95819 12.9834 2.66155 12.8583 2.41377C12.7331 2.16599 12.4814 2.0076 12.2038 2.00204C12.136 2.00068 12.0681 2 12 2Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function SunIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7.75781 7.75781C10.101 5.41467 13.899 5.41467 16.2422 7.75781C18.5853 10.101 18.5853 13.899 16.2422 16.2422C13.899 18.5853 10.101 18.5853 7.75781 16.2422C5.41467 13.899 5.41467 10.101 7.75781 7.75781Z" fill="currentColor" />
      <path d="M12 20C12.4142 20 12.75 20.3358 12.75 20.75V21C12.75 21.4142 12.4142 21.75 12 21.75C11.5858 21.75 11.25 21.4142 11.25 21V20.75C11.25 20.3358 11.5858 20 12 20Z" fill="currentColor" />
      <path d="M12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V3.25C12.75 3.66421 12.4142 4 12 4C11.5858 4 11.25 3.66421 11.25 3.25V3C11.25 2.58579 11.5858 2.25 12 2.25Z" fill="currentColor" />
      <path d="M3.25 11.25C3.66421 11.25 3.99999 11.5858 4 12C4 12.4142 3.66421 12.75 3.25 12.75H3C2.58579 12.75 2.25 12.4142 2.25 12C2.25001 11.5858 2.58579 11.25 3 11.25H3.25Z" fill="currentColor" />
      <path d="M21 11.25C21.4142 11.25 21.75 11.5858 21.75 12C21.75 12.4142 21.4142 12.75 21 12.75H20.75C20.3358 12.75 20 12.4142 20 12C20 11.5858 20.3358 11.25 20.75 11.25H21Z" fill="currentColor" />
      <path d="M5.28223 17.6572C5.57512 17.3643 6.04988 17.3643 6.34277 17.6572C6.63567 17.9501 6.63567 18.4249 6.34277 18.7178L6.16602 18.8945C5.8731 19.1871 5.39826 19.1873 5.10547 18.8945C4.81268 18.6017 4.81288 18.1269 5.10547 17.834L5.28223 17.6572Z" fill="currentColor" />
      <path d="M17.6572 17.6572C17.9501 17.3643 18.4249 17.3643 18.7178 17.6572L18.8945 17.834C19.1871 18.1269 19.1873 18.6017 18.8945 18.8945C18.6017 19.1873 18.1269 19.1871 17.834 18.8945L17.6572 18.7178C17.3643 18.4249 17.3643 17.9501 17.6572 17.6572Z" fill="currentColor" />
      <path d="M5.10547 5.10547C5.39826 4.81267 5.8731 4.81287 6.16602 5.10547L6.34277 5.28223C6.63567 5.57512 6.63567 6.04988 6.34277 6.34277C6.04988 6.63567 5.57512 6.63567 5.28223 6.34277L5.10547 6.16602C4.81287 5.8731 4.81267 5.39826 5.10547 5.10547Z" fill="currentColor" />
      <path d="M17.834 5.10547C18.1269 4.81288 18.6017 4.81269 18.8945 5.10547C19.1873 5.39826 19.1871 5.8731 18.8945 6.16602L18.7178 6.34277C18.4249 6.63568 17.9501 6.63565 17.6572 6.34277C17.3644 6.04989 17.3644 5.57512 17.6572 5.28223L17.834 5.10547Z" fill="currentColor" />
    </svg>
  )
}

export function PauseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6.75 3C5.23122 3 4 4.23122 4 5.75V18.25C4 19.7688 5.23122 21 6.75 21H7.25C8.76878 21 10 19.7688 10 18.25V5.75C10 4.23122 8.76878 3 7.25 3H6.75Z" fill="currentColor" />
      <path d="M16.75 3C15.2312 3 14 4.23122 14 5.75V18.25C14 19.7688 15.2312 21 16.75 21H17.25C18.7688 21 20 19.7688 20 18.25V5.75C20 4.23122 18.7688 3 17.25 3H16.75Z" fill="currentColor" />
    </svg>
  )
}

export function PlayIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9.24394 2.36758C7.41419 1.18362 5 2.49701 5 4.67639V19.3238C5 21.5032 7.41419 22.8166 9.24394 21.6326L20.5624 14.3089C22.2371 13.2253 22.2372 10.775 20.5624 9.69129L9.24394 2.36758Z" fill="currentColor" />
    </svg>
  )
}

export function ExclamationCircleIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7.75V12.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
    </svg>
  )
}
