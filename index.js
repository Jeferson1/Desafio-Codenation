function getFile(){

    const token = 'b055074765251dbd34c098e260819b2ce77c8754'

    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w','x', 'y', 'z']

    axios.get(`https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=${token}`)
        .then(function (response){

            const obj = response.data
            console.log(obj)

            const hashNumber = obj.numero_casas

            const encrypted = obj.cifrado.split('')
            console.log(encrypted)

            const deciphered = []
            
            for(i = 0; i < encrypted.length; i++){

                if (encrypted[i] === ' ' || encrypted[i] === '.'){
                    deciphered.push(encrypted[i])
                } else if (encrypted[i] === 'a'){
                    deciphered.push('z')
                }

                for(j = 0; j < letters.length; j++){
                    if(encrypted[i] === letters[j] && encrypted[i] !== 'a' ){
                        deciphered.push(letters[j - hashNumber])
                        break
                    } 
                }
        
            }

            console.log(deciphered)
            
            const decipheredStr =  deciphered.join('')
            console.log(decipheredStr)
                        
            // ===================================== INICIO do (SHA1)=========================================

            function SHA1 (msg) {

                function rotate_left(n,s) {

                    var t4 = ( n<<s ) | (n>>>(32-s));

                    return t4;

                };

                function lsb_hex(val) {

                    var str="";

                    var i;

                    var vh;

                    var vl;

                    for( i=0; i<=6; i+=2 ) {
   
                        vh = (val>>>(i*4+4))&0x0f;
  
                        vl = (val>>>(i*4))&0x0f;
   
                        str += vh.toString(16) + vl.toString(16);

                    }

                    return str;
            
            
                };

                function cvt_hex(val) {

                    var str="";

                    var i;

                    var v;

                    for( i=7; i>=0; i-- ) {

                        v = (val>>>(i*4))&0x0f;

                        str += v.toString(16);

                    }

                    return str;

                };

                function Utf8Encode(string) {

                    string = string.replace(/\r\n/g,"\n");

                    var utftext = "";

                    for (var n = 0; n < string.length; n++) {

                        var c = string.charCodeAt(n);

                        if (c < 128) {

                            utftext += String.fromCharCode(c);

                        }

                        else if((c > 127) && (c < 2048)) {

                            utftext += String.fromCharCode((c >> 6) | 192);

                            utftext += String.fromCharCode((c & 63) | 128);

                        }

                        else {

                            utftext += String.fromCharCode((c >> 12) | 224);

                            utftext += String.fromCharCode(((c >> 6) & 63) | 128);

                            utftext += String.fromCharCode((c & 63) | 128);

                        }

                    }

                    return utftext;

                };
            
                var blockstart;

                var i, j;

                var W = new Array(80);
     
                var H0 = 0x67452301;

                var H1 = 0xEFCDAB89;

                var H2 = 0x98BADCFE;

                var H3 = 0x10325476;

                var H4 = 0xC3D2E1F0;

                var A, B, C, D, E;

                var temp;

                msg = Utf8Encode(msg);

                var msg_len = msg.length;

                var word_array = new Array();

                for( i=0; i<msg_len-3; i+=4 ) {

                    j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |

                    msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);

                    word_array.push( j );

                }

                switch( msg_len % 4 ) {

                    case 0:

                        i = 0x080000000;

                    break;

                    case 1:

                        i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;

                    break;
   
                    case 2:

                        i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;

                    break;

                    case 3:

                        i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8    | 0x80;

                    break;

                }
            

                word_array.push( i );

                while( (word_array.length % 16) != 14 ) word_array.push( 0 );

                word_array.push( msg_len>>>29 );
            
            
                word_array.push( (msg_len<<3)&0x0ffffffff );
            

                for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
            

                    for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
            
            
                    for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);

            
                    A = H0;
            
            
                    B = H1;
            
            
                    C = H2;
            
            
                    D = H3;
            
            
                    E = H4;

                    for( i= 0; i<=19; i++ ) {
            
            
                        temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
            
            
                        E = D;
            
            
                        D = C;
            
            
                        C = rotate_left(B,30);
            
            
                        B = A;
            
            
                        A = temp;
            
            
                    }
            

                    for( i=20; i<=39; i++ ) {
            
            
                        temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
            
            
                        E = D;
            
            
                        D = C;
            
            
                        C = rotate_left(B,30);
            
            
                        B = A;
            
            
                        A = temp;
            
            
                    }

                    for( i=40; i<=59; i++ ) {
            
            
                        temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
            
            
                        E = D;
            
            
                        D = C;
            
            
                        C = rotate_left(B,30);
            
            
                        B = A;
            
            
                        A = temp;
            
            
                    }

                    for( i=60; i<=79; i++ ) {
            
            
                        temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
            
            
                        E = D;
            
            
                        D = C;
            
            
                        C = rotate_left(B,30);
            
            
                        B = A;
            
            
                        A = temp;
            
            
                    }

                    H0 = (H0 + A) & 0x0ffffffff;
            
            
                    H1 = (H1 + B) & 0x0ffffffff;
            
            
                    H2 = (H2 + C) & 0x0ffffffff;
            
            
                    H3 = (H3 + D) & 0x0ffffffff;
            
            
                    H4 = (H4 + E) & 0x0ffffffff;
            
                }

                var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
            
                return temp.toLowerCase();

            }

            // ===================================== FIM do (SHA1)=========================================
    
            // Atualizando o JSON com os campos descriptografado e usando SHA1

            obj.decifrado = decipheredStr
            obj.resumo_criptografico = SHA1(decipheredStr) // 'be94bebc530f2b7f405332b49bec5e8abb62e8d1'
            console.log(obj)

            // Função para gerar o arquivo answer.json e fazer o download

            function saveFile(text, filename){
            
                let getFileButton = document.createElement('a')
                
                getFileButton.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(text))
                getFileButton.setAttribute('download', filename)
                getFileButton.click()

            }

            saveFile( JSON.stringify(obj), 'answer.json' )
                      
        })
        .catch(function (error){
            console.warn(error)
        })
}

 
//  Função que envia o arquivo answer.json a partir do campo input do HTML

function sendFile(){

    const token = 'b055074765251dbd34c098e260819b2ce77c8754'

    const inputElement = document.querySelector('input').files
    console.log(inputElement)
    let fileFormData = new FormData()
    fileFormData.append('answer', inputElement[0])

    axios({
        method: 'post',
        url: `https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=${token}`,
        data: fileFormData,
        headers: {
            'Accept': 'application/json',
            'Content-type': 'multipart/form-data'
        }
    })
    .then(function (response) {
        console.log(response)
    })
    .catch(function (response) {
        console.log(response)
    })

}