'use client'
import React, { useEffect, useState } from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'


export default function ContactPage(){
    const [chosenservice,setChosenService]=useState<string>('')
      const [companyname,setCompanyName]=useState<string>('')
      const [secondname,setSecondName]=useState<string>('')
      const [phonenumber,setPhoneNumber]=useState<string>('')
      const [email,setEmail]=useState<string>('')
      const [description,setDescription]=useState<string>('')
      const [document,setDocument]=useState<File|null>(null)
      const [statusMessage, setStatusMessage]=useState('')
      const [statusType,setStatusType]=useState('')


    async function submitform(e:React.FormEvent<HTMLFormElement>){ 
        try{
    
          e.preventDefault()
      
          if (!phonenumber || phonenumber.trim() === "") {
            setStatusType('error')
            setStatusMessage("Phone number is required.");
            return;
          }
      
        //   const form={
        //     companyname:companyname,
        //     secondname:secondname,
        //     phonenumber:phonenumber,
        //     email:email,
        //     chosenservice:chosenservice,
        //     document:document,
        //     description:description
        //   }
      
          const formdata=new FormData()
          formdata.append("companyname",companyname)
          formdata.append("secondname",secondname)
          formdata.append("phonenumber",phonenumber)
          formdata.append("email",email)
          formdata.append("chosenservice",chosenservice)
          formdata.append("description",description)
      
          if(document){
            formdata.append("document",document)
          }
      
          console.log("FORM DATA:");
           formdata.forEach((value, key) => {console.log(key + ": ", value);});
      
      
          if(formdata){
            console.log('formdata...',formdata)
           
          }
      
      
          const contactres=await fetch('/api/route',{
            method:'POST',
            body:formdata
            })
            const response=await contactres.json()
            console.log('response...',response)
            if (response.success===true){
                setStatusType('success')
                setStatusMessage('Thank you! Your request has been submitted.')
                setCompanyName('');
                setSecondName('');
                setEmail('');
                setPhoneNumber('');
                setChosenService('');
                setDescription('');
                setDocument(null);
             
            //   setContactForm(false)
            }else{

              setStatusMessage('Oops! Something went wrong. Please try again.')
              setStatusType('error')
            }
          }catch(e){
            console.log('error from backend..',e)
          }
    
    
          }

    useEffect(()=>{
        if(statusMessage){
            setTimeout(()=>{
                setStatusMessage('')
                setStatusType('')
            },5000)

        }
    },[statusMessage])



    return(
        <div className="min-h-screen  flex items-center justify-center py-5  sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full shadow-xl rounded-2xl overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Side - Banner / Info Section */}
          <div
            className="lg:w-1/2 bg-cover bg-center flex items-center justify-center p-8"
            style={{
              backgroundImage:
                "url('/images/contact/contactImage.jpg')",
            }}
          >
            <div className="bg-black bg-opacity-50 p-6 rounded-md text-white max-w-md">
              <h2 className="text-3xl font-bold mb-2">Let’s Connect</h2>
              <p className="text-sm leading-relaxed">
                Every great partnership begins with a conversation. Reach out — we’re ready when you are.
              </p>
              <p className="mt-2 text-xs italic">
                Your success is our priority — let&apos;s build something great together.
              </p>
            </div>
          </div>
      
          {/* Right Side - Form Section */}
          <div className="lg:w-1/2 w-full p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-1">Contact Us</h2>
            <p className="text-sm text-gray-600 mb-6">Have a question or project in mind? Fill out the form below.</p>
      
            <form className="space-y-4" onSubmit={submitform}>
              <input
                type="text"
                placeholder="Company Name"
                value={companyname}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full p-3 bg-blue-50 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
      
              <input
                type="text"
                placeholder="Your Name"
                value={secondname}
                onChange={(e) => setSecondName(e.target.value)}
                className="w-full p-3 bg-blue-50 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
      
              <PhoneInput
                country={'ke'}
                enableSearch={true}
                placeholder="Phone Number"
                onChange={(phone) => setPhoneNumber(phone)}
                inputStyle={{ border: 'none', backgroundColor: '#eff6ff', width: '100%' }}
                inputClass="!w-full focus:outline-none hover:border-blue-500"
                containerClass="w-full border border-transparent hover:border-blue-500 rounded"
                buttonClass="bg-blue-50"
                dropdownClass="z-50"
              />
      
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-blue-50 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
      
              <select
                value={chosenservice}
                onChange={(e) => setChosenService(e.target.value)}
                className="w-full p-3 bg-blue-50 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Select a Service --</option>
                <option value="software">Software Solutions</option>
                <option value="ai">AI Solutions</option>
                <option value="cloud">Cloud Services</option>
                <option value="data">Data Analytics</option>
                <option value="graphics">Graphics Design</option>
                <option value="testing">Testing and Quality Assurance</option>
                <option value="others">Others</option>
              </select>
      
              <div className="space-y-1">
                <label className="text-sm text-gray-500">Upload a document for your project (optional)</label>
                <input
                  type="file"
                  className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0 file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  onChange={(e) => {
                    const filelist=e.target.files
                    if(filelist && filelist.length>0){
                      setDocument(filelist[0])
                    }
                    }}
                />
              </div>
      
              <textarea
                rows={4}
                placeholder="Briefly tell us more about your project or need..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 bg-blue-50 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
      
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            </form>

            {statusMessage && (
         <div
          className={`mt-4 p-3 rounded-md text-sm font-medium ${
          statusType === 'success'
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'}`}>
        {statusMessage}
          </div>
          )}
          </div>
        </div>
      </div>
    )
}
