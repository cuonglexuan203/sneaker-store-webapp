'use client';
import AuthenticationModal from '@/components/AuthenticationModalComponent/AuthenticationModalComponent';
import Image from 'next/image'
export default function Home() {
        function handleOpenAuthentication(){
            const authenticationModal = (document.getElementById("authenticationModal") as HTMLDialogElement);
            authenticationModal!.showModal();
        }
        return (
            <>
             <button className="button open-button" onClick={handleOpenAuthentication}>open modal</button>
             <AuthenticationModal></AuthenticationModal>
           </>
        )
}
