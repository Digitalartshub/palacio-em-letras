# Publicação — Palácio em Letras

Esta aplicação é uma PWA estática: não requer servidor de aplicação, base de dados nem contas de utilizador. Serve os ficheiros desta pasta por HTTPS.

## Publicação

1. Copie o conteúdo desta pasta para o diretório público do subdomínio, por exemplo `/var/www/jogos.museudosbiscainhos.pt/`.
2. Configure HTTPS válido. A instalação offline e o modo app só funcionam em `https://` (ou em `localhost` durante desenvolvimento).
3. Aceda ao endereço uma vez com Internet. A partir daí, a aplicação e os recursos essenciais ficam disponíveis offline no tablet.

### Exemplo Nginx

```nginx
server {
    listen 443 ssl http2;
    server_name jogos.museudosbiscainhos.pt;
    root /var/www/jogos.museudosbiscainhos.pt;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    location = /service-worker.js {
        add_header Cache-Control "no-cache";
    }
}
```

### Exemplo Apache

Ative `mod_headers` e coloque este ficheiro `.htaccess` na raiz publicada:

```apache
<Files "service-worker.js">
  Header set Cache-Control "no-cache"
</Files>
```

## Tablets no museu

- Abra o endereço no Chrome/Edge (Android/Windows) e escolha **Instalar app**, ou no Safari (iPad) use **Partilhar → Adicionar ao ecrã principal**.
- Ative o modo quiosque/Guided Access do sistema operativo para impedir saída acidental da aplicação.
- O botão **Ecrã inteiro** melhora a utilização durante a visita.

## Atualizações

Sempre que alterar ficheiros essenciais, aumente `CACHE_NAME` em `service-worker.js` (por exemplo, de `v1` para `v2`). Assim, os tablets recebem a nova versão na visita seguinte.
